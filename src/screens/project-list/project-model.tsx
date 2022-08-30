import { Button, Drawer } from "antd";
import React from "react";
import { useProjectModel } from "utils/url";
export const ProjectModel = () => {
    const { projectModalOpen, close } = useProjectModel()
    return <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
        <h1>Project Model</h1>
        <Button onClick={close}>关闭</Button>
    </Drawer>
}