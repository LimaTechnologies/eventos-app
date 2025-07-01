import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
// @ts-ignore
import * as qs from "qs";

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    endDate?: string;
    time: string;
    image: string;
    location: string;
}

const EVENTS_PATH = path.resolve(__dirname, "./lib/events.json");

function generateEventId(title: string, date: string): string {
    return `${title.toLowerCase().replace(/\s+/g, "-")}-${date.split("T")[0]}`;
}

function parseDateRange(text: string): { date: string; endDate?: string; time: string } {
    const parts = text.trim().split(" - ");
    const fullYear = (y: string) => parseInt(y.length === 2 ? "20" + y : y);

    // Exemplo: 12/07/25 - 19:00 às 00:00
    if (parts.length === 2 && parts[0].match(/\d{2}\/\d{2}\/\d{2}/) && parts[1].includes("às")) {
        const [dateStr, timeRange] = parts;
        const [startHour] = timeRange.split(" às ").map(s => s.trim());
        const [day, month, year] = dateStr.split("/");
        const base = `${fullYear(year)}-${month}-${day}`;
        return {
            date: `${base}T${startHour}:00`,
            time: startHour,
        };
    }

    // Exemplo: 26/06/25 - 18/07/25
    if (parts.length === 2 && parts[0].match(/\d{2}\/\d{2}\/\d{2}/) && parts[1].match(/\d{2}\/\d{2}\/\d{2}/)) {
        const [ds, ms, ys] = parts[0].split("/");
        const [de, me, ye] = parts[1].split("/");
        const start = `${fullYear(ys)}-${ms}-${ds}T00:00:00`;
        const end = `${fullYear(ye)}-${me}-${de}T23:59:59`;

        return {
            date: start,
            endDate: end,
            time: "00:00 - 23:59",
        };
    }

    // Exemplo: 30/06/25 - 19:00
    if (parts.length === 2 && parts[0].match(/\d{2}\/\d{2}\/\d{2}/) && parts[1].match(/\d{2}:\d{2}/)) {
        const [dateStr, hour] = parts;
        const [d, m, y] = dateStr.split("/");
        const base = `${fullYear(y)}-${m}-${d}`;
        return {
            date: `${base}T${hour}:00`,
            time: hour
        };
    }

    return {
        date: new Date().toISOString(),
        time: "00:00",
    };
}

function extractEventsFromHTML(html: string, existingEvents: Event[]): Event[] {
    const $ = cheerio.load(html);
    const newEvents: Event[] = [];

    $("a.item_news").each((_, el) => {
        const title = $(el).find("strong").text().trim();
        const href = $(el).attr("href") || "";
        const imageStyle = $(el).find(".foto").attr("style") || "";
        const imageMatch = imageStyle.match(/url\(['"]?(.*?)['"]?\)/);
        const image = imageMatch ? "https://aracatuba.sp.gov.br/" + imageMatch[1] : "";
        const location = $(el).find("i.fa-location-dot").parent().text().trim();
        const dateText = $(el).find("i.fa-calendar").parent().text().trim();
        const description = $(el).find("span").last().text().trim();

        const { date, endDate, time } = parseDateRange(dateText);
        const id = generateEventId(title, date);

        if (!existingEvents.some(ev => ev.id === id)) {
            newEvents.push({
                id,
                title,
                description,
                date,
                endDate,
                time,
                image,
                location,
            });
        }
    });

    return newEvents;
}

function readExistingEvents(): Event[] {
    if (!fs.existsSync(EVENTS_PATH)) return [];
    const data = fs.readFileSync(EVENTS_PATH, "utf-8");
    return JSON.parse(data);
}

function writeEvents(events: Event[]) {
    fs.writeFileSync(EVENTS_PATH, JSON.stringify(events, null, 2), "utf-8");
}

async function fetchAgendaHTML(month: number, year: number) {
    const formData = qs.stringify({ iData: "", mes: `${year}-${month}` });
    const res = await axios.post(
        "https://aracatuba.sp.gov.br/cultura/utils/ajax/ajax_agenda.php",
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    return res.data;
}

async function main() {
    const existingEvents = readExistingEvents();
    const now = new Date();
    let newEvents: Event[] = [];

    for (let i = 0; i <= 3; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() + i);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        console.log(`📥 Baixando eventos de ${month}/${year}...`);
        const html = await fetchAgendaHTML(month, year);
        const extracted = extractEventsFromHTML(html, existingEvents.concat(newEvents));
        console.log(`→ ${extracted.length} novo(s) evento(s) encontrados.`);
        newEvents = [...newEvents, ...extracted];
    }

    const all = [...existingEvents, ...newEvents];
    writeEvents(all);
    console.log(`✅ ${newEvents.length} evento(s) adicionados. Total agora: ${all.length}`);
}

main().catch(console.error);
