export default function addDays(date: Date, days: number) : Date {
    const updated = new Date(date.valueOf());
    updated.setDate(updated.getDate() + days);
    return updated;
}