const GENDER = {
    male: { id:1, label: "男性" },
    female: { id:2, label: "女性" }
}

const GENDER_ARRAY = Object.entries(GENDER).map((item) => item[1])

const DEFAULT_GENDER = GENDER.male.id

export { GENDER, GENDER_ARRAY, DEFAULT_GENDER }