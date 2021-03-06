# behavioral-ecsy-system

This is abstract [ECSY] [System], that splits the `execute` method into behaviours.       
Behaviours is the pure functions, related to [Query]. Functions, that takes data from one components and transfer it to other componens.

[ECSY]: https://ecsy.io
[System]: https://ecsy.io/docs/#/manual/Architecture?id=systems
[Query]: https://ecsy.io/docs/#/manual/Architecture?id=queries

### Example

```javascript

class InputSystem extends BehaviouralSystem {
    static behaviours = {
         mouseClick: {
          read: [MouseEvent], // readable components
          write: [MouseInput], // mutable components
          execute: ({MouseEvent: button}, {MouseInput: buttons}) => buttons.push(button)
        },
        mouseMovement: {
            read: [MouseEvent, Window],
            write: [MouseInput], 
            execute: ({
                MouseEvent: {clientX, clientY}, 
                Window: {innerWidth, innerHeight}
              }, 
              {MouseInput: position}
            ) => {
              position.x = clientX / innerWidth * 2 - 1
              position.y = clientY / innerHeight * -2 + 1
            }
        }
    }
}
// InputSystem.queries will be generated automatically
                                         
```
