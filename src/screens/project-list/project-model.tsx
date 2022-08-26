import { Button, Drawer } from "antd";
import {useDispatch, useSelector} from 'react-redux'
import { projectListSlice, selectProjectModelOpen } from "screens/project-list/project-list.slice";
import React from "react";
export const ProjectModel = () => {
    const dispatch = useDispatch()
    const projectModelOpen = useSelector(selectProjectModelOpen)
    return <Drawer 
        onClose={() => dispatch(projectListSlice.actions.closeProjectModel())} 
        visible={projectModelOpen} width={'100%'}>
        <h1>Project Model</h1>
        <Button onClick={() => dispatch(projectListSlice.actions.closeProjectModel())}>关闭</Button>
    </Drawer>
}