import BaseLink from "s/components/links/Link.jsx";

export const DownloadAppLink = (props) => {

    const LAST_APK_VERSION_FILE_NAME = 'wou_after_workout_activity.apk';
    const WOU_PUBLIC_GIT_URL = 'https://github.com/leonardoWer/Wou-android-app/raw/refs/heads/main/apk/' + LAST_APK_VERSION_FILE_NAME;

    const downloadProps = {
        ...props,
        onClick: {
            href: WOU_PUBLIC_GIT_URL || ''
        },
        download: LAST_APK_VERSION_FILE_NAME || '',
    };

    return <BaseLink {...downloadProps} />;
}