import GeneralSettingsForm from "@/components/admin/GeneralSettingsForm";
import { getSettings } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function GeneralSettingsPage() {
    const settings = await getSettings();

    return <GeneralSettingsForm initialSettings={settings} />;
}
