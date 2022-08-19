import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useDebounce, useDocumentTitle } from "../../utils"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { useProjectsSearchParams } from "./util"
// import {Helmet} from "react-helmet"
export const ProjectListScreen = () => {
    useDocumentTitle("项目列表", false);
    const [param, setParam] = useProjectsSearchParams()
    const {isLoading, error, data: list} = useProjects(useDebounce(param, 200))
    const { data: users} = useUsers()
    return (<Container>
        {/* <Helmet><title>请登录或注册</title></Helmet> */}
        <h1>项目列表</h1>
        <SearchPanel param ={param} setParam = {setParam} users={users || []}/>
        {error? <Typography.Text type={"danger"}>{error.message}</Typography.Text>: null}
        <List loading={isLoading} dataSource={list || []} users={users || []}/>
    </Container>)
}

const Container = styled.div`
padding: 3.2rem
`
ProjectListScreen.whyDidYouRender = false