import { System } from "ecsy"
const { entries, keys, fromEntries } = Object

export default class BehavioralSystem extends System {
    static behaviours = {}
    constructor( world, attributes={} ){
        const { queries, behaviours } = constructor
        constructor.queries = {...queries,
            ...fromEntries(entries( behaviours ).map(
                ([name, { read=[], write=[] }]) => 
                ([name, { components: read.concat(write) }])
            ))
        }
        super(world, attributes)
    }

    execute(){
        const { constructor, queries, world:{componentsManager:{Components}} } = this
        const { behaviours } = constructor
        const names = keys( queries )
        for(const name of names ){
            const { read=[], write=[], execute: transfer=Function()} = behaviours[ name ]
            const { results=[] } = queries[ name ]
            for(const entity of results ){
                const fromProps = fromEntries( read.map( className => 
                    [className, entity.getComponent(Components[ className ])]
                ))
                const toProps = fromEntries( write.map( className => 
                    [className, entity.getMutableComponent(Components[ className ])]
                ))
                transfer( fromProps, toProps )
            }
        }
    }
}
