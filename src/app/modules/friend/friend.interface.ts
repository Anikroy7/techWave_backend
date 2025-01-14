

export type TFriend = {
    requestSender: String;
    requestReciever: String;
    status: "ACCEPTED" | "REJECTED" | "PENDING",
    isDeleted: Boolean
}