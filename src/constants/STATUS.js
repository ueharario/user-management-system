const STATUS = {
    success: { status: 200, msg: "成功しました"},
    error: { status: 400, msg: "失敗しました"}
}

const DEFAULT_STATUS = {
    status: 0,
    msg: "通信中"
}

export { STATUS, DEFAULT_STATUS }