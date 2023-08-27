import React from "react";
import Context from "./discussionsContext";

interface Props {
    children?: React.ReactNode // Maneras de declarar elementos hijos
    // children: JSX.Element // Maneras de declarar elementos hijos
    discussionsList: object[],
}

const List = (props: Props) => {
    const { discussionsList } = props;
    return <Context>
        <h2>Discuciones</h2>
        {discussionsList.map((discussion: any) => <li>{discussion.title}</li>)}
    </Context>
};

export default List;
