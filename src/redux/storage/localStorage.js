export const loadData = (name) => {
    try {
        const data = localStorage.getItem(name);
        return data ? JSON.parse(data) : undefined;
    } catch (error) {
        console.error('Failed to load todos from localStorage', error);
        return undefined;;
    }
};

export const saveData = (name, data) => {
    try {
        localStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save todos to localStorage', error);
    }
};