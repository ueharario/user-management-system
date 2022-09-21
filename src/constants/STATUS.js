const API_STATUS = {
    success: { status: 200, msg: "成功しました"},
    error: { status: 400, msg: "失敗しました"}
}

const DEFAULT_API_STATUS = {
    status: 0,
    msg: "通信中"
}

export { API_STATUS, DEFAULT_API_STATUS }