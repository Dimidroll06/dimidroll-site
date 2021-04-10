function animatedSpriteBedJS(BedPlug){
    return function(Layer, params={}){
        var Bed = BedPlug;
        var __ctx = Bed.context;
        var redy = false;

        this.layer = Layer
        
        this.spriteSheet     = new Image();
        this.spriteSheet.src = params.src           || "lib/img/logo_sheet.png";
        

        this.ainimation      = [new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1)];
        this.ainimationSpeed = 2;
        this.frame           = 0;
        this.elementsCount   = params.elementsCount || new Vector2(2, 2);


        this.position        = params.position || new Vector2(0, 0);
        this.size            = params.size     || new Vector2(32, 32);
        this.color           = params.color    || new RGB(255, 0, 0);
        this.opacity         = params.opacity  || 1;
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
        
        /**
         * Change size of rect
         * @param {Number} x - sprite width
         * @param {Number} y - sprite height
         */
        this.setSize = (x, y)=>{
            this.size.x = x;
            this.size.y = y;
        }

        this.scale = (x, y)=>{
            this.size.x = this.image.width  / this.elementsCount.x * x
            this.size.y = this.image.height / this.elementsCount.y * y
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
            else WARN('everyTick of rect can\'t be a '&typeof func);
        }

        var __spriteAfterDraw = ()=>{};
        this.__spriteAfterDraw = __spriteAfterDraw
        /**
         * set __spriteAfterDraw function of rect
         * @param {Function} func 
         */
        this.afterDraw = (func)=>{
           if(typeof func === 'function') __spriteAfterDraw = func;
           else WARN('__spriteAfterDraw of rect can\'t be a '&typeof func);
        }

        if(this.ainimationSpeed > 0){
            setInterval(() => {
                this.frame++
                if(this.frame>=this.ainimation.length) this.frame = 0
            }, 1000/this.ainimationSpeed);
        }
        ////Draw
        this.draw = ()=>{
            //etick
            __spriteEveryTick();

            // //draw
            // __ctx.drawImage(
            //     this.image, 
            //     this.position.x + (this.layer.paralax.x * Bed.scroll.x),
            //     this.position.y + (this.layer.paralax.y * Bed.scroll.y), 
            //     this.size.x, 
            //     this.size.y)
            var WW = this.spriteSheet.width /this.elementsCount.x
            var HH = this.spriteSheet.height/this.elementsCount.y

            __ctx.drawImage(
                this.spriteSheet,
                this.ainimation[this.frame].x*WW,
                this.ainimation[this.frame].y*HH,
                WW, HH,
                this.position.x + (this.layer.paralax.x * Bed.scroll.x),
                this.position.y + (this.layer.paralax.y * Bed.scroll.y), 
                this.size.x,
                this.size.y
            )
            //aDraw
            __spriteAfterDraw()
        }
        this.layer.sprites.push(this)
    }
}