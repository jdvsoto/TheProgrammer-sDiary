import User from '../user/user.model.js';
import Admin from '../Admin/admin.model.js';

export const existentEmail = async (email = '') => {
    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error(`The email ${email} is already registered`);
    }
};

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id)
    if (!existeUsuario) {
        throw new Error(` el ID: ${id} no existe`)
    }
}

export const existentUsername = async (userName = '') => {
    const exists = await User.findOne({ userName });
    if (exists) {
        throw new Error(`The username ${userName} is already registered`);
    }
}

export const mainAdmin = async (userAdmin = '') => {
    const mainAdmin = await Admin.findOne({ userAdmin });
    if (mainAdmin) {
        throw new Error(`There can only be one main administrator. The main administrator is ${userAdmin}`);
    }
}