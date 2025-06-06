import axios from "axios";

// export const API_BASE_URL = "http://10.0.2.2:8080"; //localhost no emulador android
export const API_BASE_URL = "http://localhost:8080"; //meu ip

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function findById<T>(id: string | number, route: string) {
    try {
        const response = await api.get<T>(`${route}/${id}`)
        return response.data
    } catch (error) {
        console.error('Erro ao buscar registro:', error);
        throw error;
    }
}

export async function findAll<T>(route: string) {
    try {
        const response = await api.get<T[]>(`${route}`)
        return response.data;
    } catch (error) {
        console.log('Erro ao buscar registros:', error);
        throw error;
    }
}

export async function save<T extends {id: string | number}>(obj: T, route: string) {
    try {
        const method = obj.id ? 'PUT' : 'POST';
        const url = obj.id ? `${route}/${obj.id}` : `${route}`;
        let response

        if(method == 'PUT'){
            response = await api.put(url, obj)
        }else{
            response = await api.post(url, obj)
        }
        
        return response.data
    } catch (error) {
        console.error('Erro ao salvar registro:', error);
        throw error;
    }
}

export async function saveWithFormData<T>(obj: FormData, route: string) {
    const id = obj.get('id')
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${route}/${id}` : `${route}`;

    try {
        let response;

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        if (method === 'PUT') {
            response = await api.put(url, obj, config);
        } else {
            response = await api.post(url, obj, config);
        }
        
        return response.data
    } catch (error) {
        console.error('Erro ao salvar registro:', error);
        throw error;
    }
}

export async function deleteById(id: string | number, route: string) {
    try {
        const response = await api.delete(`${route}/${id}`)
        return response.data
    } catch (error) {
        console.error('Erro ao salvar registro:', error);
        throw error;
    }
}

export default api;
