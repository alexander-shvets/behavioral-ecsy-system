import { System } from "ecsy"
const { entries, keys, fromEntries } = Object

export default class BehavioralSystem extends System {
    static behaviours = {}
    constructor(){
        constructor.queries = fromEntries(
            entries( constructor.behaviours ).map(
                ([name, {read, write}]) => ([name, {
                    components: [...read, ...write]
                }])
            )
        )
        super()
    }

    execute(){
        const { constructor, queries } = this
        const { behaviours } = constructor
        const names = keys( queries )
        for(const name of names ){
            const { read, write, execute: transfer} = behaviours[ name ]
            const { results } = queries[ name ]
            for(const entity of results ){
                const from = entries( read.map( className => 
                    [className, entity.getComponent( window[ className ] )]
                ))
                const to = entries( write.map( className => 
                    [className, entity.getMutableComponent( window[ className ] )]
                ))
                transfer( from, to )
            }
        }
    }
}