import {MaNotification} from "@mobileaction/action-kit";

export function giveNotification(title, description, type){
    MaNotification[type]({
        size: "large",
        variant: "filled",
        title: title,
        description: description
    });
}
