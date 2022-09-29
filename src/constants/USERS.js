const GENDER = {
    male: { id:1, label: "Male" },
    female: { id:2, label: "Female" }
}

const GENDER_ARRAY = Object.entries(GENDER).map((item) => item[1])

const DEFAULT_USER = {
    id: 0,
    name: '',
    gender: 0,
    maleMessage: '',
    femaleMessage: ''
}

const DEFAULT_EDIT_INDEX = -1

const TITLE = {
    title: "User-Management-System",
    card_title: "Create New",
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    name: "Name",
    gender: "Gender",
    close: "Close",
    save: "Save"
}

export { GENDER, GENDER_ARRAY, DEFAULT_USER, DEFAULT_EDIT_INDEX, TITLE }