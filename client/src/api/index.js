const serverUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';


//UserPart
export const getBooks = async () => {

    const response = await fetch(`${serverUrl}/books`, {
        method: 'GET',
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error(await response.text())
    }
    return await response.json();
}


export const getTheBook = async (id) => {

    const response = await fetch(`${serverUrl}/books/${id}`, {

        method: 'GET',
        credentials: 'include'


    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();

}

export const arrangeBook = async (id) => {

    const response = await fetch(`${serverUrl}/books/${id}`, {

        method: 'POST',
        credentials: 'include',


    });

    console.log(id)
    if (!response.ok) {

        throw new Error(await response.text());
    }


}

export const getArrangedBooks = async () => {

    const response = await fetch(`${serverUrl}/users/books`, {

        credentials: 'include'

    })

    if (!response.ok) {
        throw new Error(await response.text());
    }
    return await response.json();


}


export const register = async (userData) => {

    const response = await fetch(`${serverUrl}/user/register`, {

        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(await response.text())
    }

}

export const login = async (userData) => {

    const response = await fetch(`${serverUrl}/user/login`, {

        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),

    });

    if (!response.ok) {
        throw new Error(await response.text())
    }
    window.location.reload()

}

export const logOut = async () => {

    const response = await fetch(`${serverUrl}/user/logout`, {

        method: 'GET',
        credentials: 'include'

    })

    if (!response.ok) throw new Error(await response.text())
    window.location.reload()
}

//Admin Part
export const adminLogin = async (adminData) => {

    const response = await fetch(`${serverUrl}/admin/login`, {

        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)

    })

    if (!response.ok) throw new Error(await response.text())
    window.location.reload()

}

export const adminLogOut = async () => {

    const response = await fetch(`${serverUrl}/admin/logout`, {

        method: 'GET',
        credentials: 'include'
    })
    if (!response.ok) throw new Error(await response.text())
    window.location.reload()
}

export const adminGetBooks = async () => {

    const response = await fetch(`${serverUrl}/admin/books`, {
        method: 'GET',
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error(await response.text())
    }
    return await response.json();

}

export const adminAddBook = async (bookData) => {

    const response = await fetch(`${serverUrl}/admin/books`, {

        method: 'POST',
        credentials: 'include',

        headers: {

            'Content-Type': 'Application/json'

        },
        body: JSON.stringify(bookData)

    })

    if (!response.ok) {
        throw new Error(response.text())
    }
    window.location.reload()
}

export const adminUpdateBook = async (id, bookData) => {

    const response = await fetch(`${serverUrl}/admin/books/${id}`, {

        method: 'PUT',
        credentials: 'include',
        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify(bookData)

    });
    console.log(bookData)

    if (!response.ok) {
        throw new Error(await response.text())
    }
    window.location.reload()

}


export const adminDeleteBook = async (id) => {

    const response = await fetch(`${serverUrl}/admin/books/${id}`, {

        method: 'DELETE',
        credentials: 'include'
    })


    if (!response.ok) {
        throw new Error(await response.text())

    }
    window.location.reload()

}

export const adminGetUsers = async () => {

    const response = await fetch(`${serverUrl}/admin/users`, {

        method: 'GET',
        credentials: 'include'

    })

    if (!response.ok) {
        throw new Error(await response.text())

    }
    return await response.json();

}

export const adminGetUser = async (id) => {

    const response = await fetch(`${serverUrl}/admin/users/${id}`, {

        method: 'GET',
        credentials: 'include'

    })

    if (!response.ok) {
        throw new Error(await response.text())
    }
    return await response.json()

}

