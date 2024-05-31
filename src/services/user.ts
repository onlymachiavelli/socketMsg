import User from "../models/user"

const getAll = async () => {
  return await User.find()
}

//find by matricule
const findByMatricule = async (matricule: string) => {
  return await User.findOneBy({
    matricule: matricule,
  })
}

export { getAll, findByMatricule }
