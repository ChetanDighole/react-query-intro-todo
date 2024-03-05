// import React from "react";
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const Form = () => {
    const [text, setText] = useState('');

    const createTodo = (text) => {
        fetch('http://localhost:8000/todo/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: text }),
        })

    }

    const queryClient = useQueryClient()

    const todoMutation = useMutation({
        mutationKey: ["create"],
        mutationFn: () => createTodo(text),
        onSuccess: () => {
            console.log('Success')
            queryClient.invalidateQueries(['todo'])
        },
        onError: (error) => {
            console.log('Error')
        },
    })
    return (
        <div>
            <input type='text' onChange={e => setText(e.target.value)} value={text} />
            <button onClick={(e) => todoMutation.mutate()}>Create</button>
        </div>
    )
}

