const GENDER = {
    male: { id:1, label: "Male" },
    female: { id:2, label: "Female" }
}

const GENDER_ARRAY = Object.entries(GENDER).map((item) => item[1])

const DEFAULT_USER = {
    // name: 'Michael',
    // gender: GENDER.male.id
    id: 0,
    name: '',
    gender: 0
}

const TITLE = {
    title: "User-Management-System",
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    name: "Name",
    gender: "Gender",
    close: "Close",
    save: "Save"
}

const DEFAULT_EDIT_INDEX = -1

export { GENDER, GENDER_ARRAY, DEFAULT_USER, TITLE, DEFAULT_EDIT_INDEX }