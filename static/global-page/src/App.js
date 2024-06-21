import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import { CodeBlock } from '@atlaskit/code';
view.theme.enable()

function App() {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await invoke(
                'getIssues', 
                { params: 
                    { 
                        showSubTasks: true, 
                        query: "" } 
                    }
                );
            if (response.status == 200 && response?.data) {
                setData(JSON.stringify(JSON.parse(response.data), null, 2));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {data ? <CodeBlock language="json" showLineNumbers={true} text={data}/> : 'Loading...'}
        </div>
    );
}

export default App;
