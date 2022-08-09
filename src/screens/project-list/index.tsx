import { useEffect, useState } from "react"
import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject, useMount, useDebounce } from "../../utils"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({ name: '', personId: '' });
    const [list, setList] = useState([])
    const debounceParam = useDebounce(param, 500)
    const client = useHttp()
    useEffect(() => {
        client('projects', {data: cleanObject(debounceParam)}).then(setList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceParam])
    useMount(() => {
        client('users', {}).then(setUsers)
    })
    return (<Container>
        <h1>项目列表</h1>
        <SearchPanel param ={param} setParam = {setParam} users={users}/>
        <List list={list} users={users}/>
    </Container>)
}

const Container = styled.div`
padding: 3.2rem
`