const GENDER = {
    male: { id:1, label: "Male" },
    female: { id:2, label: "Female" }
}

const GENDER_ARRAY = Object.entries(GENDER).map((item) => item[1])

const DEFAULT_USER = {
    name: 'Michael',
    gender: GENDER.male.id
}

const TITLE = {
    title: "User-Management-System",
    create: "Create",
    edit: "Edit",
    name: "Name",
    gender: "Gender",
    close: "Close",
    save: "Save"
}

const DEFAULT_EDIT_INDEX = -1

export { GENDER, GENDER_ARRAY, DEFAULT_USER, TITLE, DEFAULT_EDIT_INDEX }