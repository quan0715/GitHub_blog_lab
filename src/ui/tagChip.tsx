

export type IssueTag = {
    id: number,
    node_id: string,
    name: string,
    color: string,
    description: string,
    default: boolean
}

export function TagChip({labelData}: {labelData: IssueTag}){
    console.log(labelData)
    return (
        <div className={"px-1"}>
            <div
                key={labelData.id}
                className={'inline text-sm font-mono rounded-md px-3 py-1 border-2 break-keep overflow-clip'}
                style={{
                    color: `#${labelData.color}`,
                    backgroundColor: `#${labelData.color}1A`,
                    borderColor: `#${labelData.color}`
                }}
            >
                {`# ${labelData.name}`}
            </div>
        </div>
    )
}