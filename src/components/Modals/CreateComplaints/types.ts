export enum StagesCreateComplaints {
    Start, ComplaintText
}

export enum CreateComplaintsType {
    Reviews, Places
}


export const CreateComplaintsTexts = [
    [
        "Некорректное изображение", "Недоброжелательное описание",
        "Повтор", "Другое"
    ],
    [
        "Это место уже есть", "Неподходящие категории",
        "Неподходящие фильтры", "Другое"
    ]
] as const;