import { useEffect, useState } from "react"
import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject, useMount, useDebounce } from "../../utils"
import qs from "qs";
import { useHttp } from "utils/http"
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({ name: '', personId: '' });
    const [list, setList] = useState([])
    const debounceParam = useDebounce(param, 500)
    const client = useHttp()
    useEffect(() => {
        client('projects', {data: cleanObject(debounceParam)}).then(setList)
    }, [debounceParam])
    useMount(() => {
        client('users', {}).then(setUsers)
    })
    return <div>
        <SearchPanel param ={param} setParam = {setParam} users={users}/>
        <List list={list} users={users}/>
    </div>
}
