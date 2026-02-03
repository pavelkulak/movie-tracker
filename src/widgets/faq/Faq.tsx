import { Accordion } from "@/shared/ui";
import { useTranslate } from "@/shared/i18n";
import { locales } from "./locales";
import { FAQ_IDS } from "./constants";

export const Faq = () => {
    const t = useTranslate(locales);
    const accordionItems = FAQ_IDS.map((id) => ({
        value: id,
        title: t(`${id}.title`),
        text: t(`${id}.text`),
    }));


    return (
        <Accordion items={accordionItems} />
    )
}