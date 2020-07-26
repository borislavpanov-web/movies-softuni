import {hideLoading, showLoading} from "./controllers/notification.js";


function host(endpoint) {
    return `https://api.backendless.com/4ACF7695-B1AE-A992-FF74-FAD5A4D35400/C970D0FB-D532-4621-93B4-43130F8EDF0C/${endpoint}`
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movie',
    MOVIE_BY_ID: 'data/movie/'
}

export async function register(username, password) {
    showLoading();
    const result = (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();

    hideLoading();

    return result;
}

export async function login(username, password) {
    showLoading();
    const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();
    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    hideLoading();
    return result;
}

export async function logout() {
    showLoading();
    const token = localStorage.getItem('userToken');
    localStorage.removeItem('userToken');
    const result = fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });


    hideLoading();

    return result

}

export async function getMovies() {
    showLoading();
    const token = localStorage.getItem('userToken');
    const result =  (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json()
    hideLoading();

    return result;
}

export async function getMovieById(id) {
    showLoading();
    const token = localStorage.getItem('userToken');
    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json()

    hideLoading();

    return result;
}

export async function createMovie(movie) {
    showLoading();
    const token = localStorage.getItem('userToken');
    const result = (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie),
    })).json()


    hideLoading();
    return result;
}

export async function updateMovie(id, updatedProps) {
    showLoading();
    const token = localStorage.getItem('userToken');
    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps),
    })).json()

    hideLoading();
    return result;
}

export async function deleteMovie(id) {
    showLoading();

    const token = localStorage.getItem('userToken');
    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
    })).json()

    hideLoading();
    return result;

}

export async function getMovieByOwnerId(ownerId) {
    showLoading();
    const token = localStorage.getItem('userToken');
    const result = (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token,
        }

    })).json();

    hideLoading();
    return result;

}

export async function buyTicket(movie) {

    const newTicket = movie.tickets - 1;
    const movieId = movie.objectId;
    return updateMovie(movieId, {tickets: newTicket});

}
