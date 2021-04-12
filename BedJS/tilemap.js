function TilemapBedJS(BedPlug){
    return function(Layer, params={}){
        var Bed = BedPlug;
        var __ctx = Bed.context;
        var __canv = Bed.domElement;
        var redy = false;

        this.layer = Layer
        
        this.spritesheet     = new Image();
        this.spritesheet.src = params.src        || "lib/img/logo_sheet.png";
        this.tilesCount      = params.tilesCount || new Vector2(2, 2);
        this.tileSheet       = params.tileSheet  ||  [ 
            [ new Vector2(0, 0), new Vector2(1, 0) , new Vector2(0, 0), new Vector2(1, 0) ],
            [ new Vector2(0, 0), new Vector2(1, 0) , new Vector2(0, 0), new Vector2(1, 0) ],
            [ new Vector2(0, 1), new Vector2(1, 1) , new Vector2(0, 1), new Vector2(1, 1) ],
            [ new Vector2(0, 1), new Vector2(1, 1) , new Vector2(0, 1), new Vector2(1, 1) ]
        ]
        this.tileSize        = params.tileSize   || new Vector2(32, 32)
        this.position        = params.position   || new Vector2(0, 0);
        this.color           = params.color      || new RGB(255, 0, 0);
        this.opacity         = params.opacity    || 1;
        this.visible         = (typeof params.visible === 'boolean'?params.visible:true);
        
        /////Actions
        
        /**
         * Change position of rect
         * @param {Number} x - x position of rect
         * @param {Number} y - y position of rect
         */
        this.setPosition = (x, y)=>{
            this.position.x = x;
            this.position.y = y;
        }
        
        this.moveToTop = ()=>{
            var move = this.layer.sprites.splice(this.layer.sprites.indexOf(this), 1);
            
            this.layer.sprites.push(move[0])
        }
        
        this.moveToBottom = ()=>{
            var move = this.layer.sprites.splice(this.layer.sprites.indexOf(this), 1);
            
            this.layer.sprites.unshift(move[0])
        }
        /**
         * Delete object from BedJS (not from variable)
         */
        this.delete = ()=>{
            this.layer.sprites.splice(this.layer.sprites.indexOf(this), 1);
            console.log(this.layer.sprites.indexOf(this))
        }
        
    ////Events
        var __spriteEveryTick = ()=>{};
        
        this.__spriteEveryTick = __spriteEveryTick
        
        /**
         * set everyTick function of rect
         * @param {Function} func 
         */
        this.everyTick = (func)=>{
            if(typeof func === 'function') __spriteEveryTick = func;
            else WARN('everyTick of tilemap can\'t be a '&typeof func);
        }

        var __spriteAfterDraw = ()=>{};
        this.__spriteAfterDraw = __spriteAfterDraw
        /**
         * set __spriteAfterDraw function of rect
         * @param {Function} func 
         */
        this.afterDraw = (func)=>{
           if(typeof func === 'function') __spriteAfterDraw = func;
           else WARN('__spriteAfterDraw of tilemap can\'t be a '&typeof func);
        }

        ////Draw
        this.draw = ()=>{
            //etick
            __spriteEveryTick();

            //draw

            // __ctx.drawImage(
            //     this.image, 
            //     this.position.x + (this.layer.paralax.x * Bed.scroll.x),
            //     this.position.y + (this.layer.paralax.y * Bed.scroll.y), 
            //     this.size.x, 
            //     this.size.y)

            this.tileSheet.forEach((yArr, y) => {
                yArr.forEach((tilePos, x) => {
                            
                            var tileWidth = this.spritesheet.width / this.tilesCount.x
                            var tileHeight = this.spritesheet.height / this.tilesCount.y

                            __ctx.drawImage(
                                this.spritesheet,
                                tileWidth*tilePos.x,
                                tileHeight*tilePos.y,
                                tileWidth,
                                tileHeight,
                                
                                this.tileSize.x*x + this.position.x + (this.layer.paralax.x * Bed.scroll.x),
                                this.tileSize.y*y  + this.position.y + (this.layer.paralax.y * Bed.scroll.y),
                                this.tileSize.x,
                                this.tileSize.y
                            )
                })
            });

            //aDraw
            __spriteAfterDraw()
        }

        this.layer.sprites.push(this)
    }
}