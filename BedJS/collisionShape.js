
/**
 * creates Shape for your Bed object.
 * Don't frogot add everyTick from *Object*.plugins.mesh.everyTick
 * @param {*} Object Bed object(has position(Vector2))
 * @param {Array} collisionPoints array of collision points used for creation mask like [new Vector2(0, 0), new Vector2(100, 0), new Vector2(100, 100), new Vector2(0, 100)]
 */
function makeCollisionShape(Object, collisionPoints = [new Vector2(0, 0), new Vector2(100, 0), new Vector2(100, 100), new Vector2(0, 100)]){
    //Base for all of the plugins
    if( typeof Object.plugins === "undefined" ) Object.plugins = {}

    Object.plugins.mesh = {}
    var pluginRel = Object.plugins.mesh

    pluginRel.polygon = new SAT.Polygon(new Vector2(0, 0), collisionPoints);
    pluginRel.everyTick = ()=>{
        pluginRel.polygon.pos.x = Object.position.x
        pluginRel.polygon.pos.y = Object.position.y
    }

    //console.log(Object.plugins.mesh)
}