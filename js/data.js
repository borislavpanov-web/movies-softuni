function host(endpoint) {
    return `https://api.backendless.com/4ACF7695-B1AE-A992-FF74-FAD5A4D35400/C970D0FB-D532-4621-93B4-43130F8EDF0C/${endpoint}`
}

const endpoints = {
    REGISTER: 'users/user',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movie',
    MOVIE_BY_ID: 'data/movie/'
}

async function register(username, password) {
    return (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();
}

async function login(username, password) {
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

    return result;
}

function logout() {
    const token = localStorage.getItem('userToken');
    return fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });
}

async function getMovies() {
    const token = localStorage.getItem('userToken');
    return (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json()
}

async function getMovieById(id) {
    const token = localStorage.getItem('userToken');
    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json()
}

async function createMovie(movie) {
    const token = localStorage.getItem('userToken');
    return (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie),
    })).json()
}

async function updateMovie(id, updatedProps) {
    const token = localStorage.getItem('userToken');
    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps),
    })).json()
}

async function deleteMovie(id) {
    const token = localStorage.getItem('userToken');
    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
    })).json()
}

async function getMovieByOwnerId(ownerId) {
    const token = localStorage.getItem('userToken');
    return (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token,
        }

    })).json();
}

async function buyTicket(movie) {

    const newTicket = movie.tickets - 1;
    const movieId = movie.objectId;
    return updateMovie(movieId, {tickets: newTicket});

}
