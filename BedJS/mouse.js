function MouseBedJS(BedPlug){
    return function(){
        var Bed  = BedPlug,
            canv = Bed.domElement
            

        //mouse position
        this.position       = new Vector2(-1, -1)
        this.globalPosition = new Vector2(-1, -1)

        window.addEventListener('mousemove', e=>{
            if(canv != undefined){
                var rect = canv.getBoundingClientRect()

                var WIDTH  = canv.width
                var HEIGHT = canv.height

                this.position.y = (e.clientY - rect.top)/(rect.bottom-rect.top)*HEIGHT
                this.position.x = (e.clientX - rect.left)/(rect.right-rect.left)*WIDTH
            }
            this.globalPosition.x = e.clientX
            this.globalPosition.y = e.clientY
        })

        //buttons

        //pressed
        this.isAnyButtonPressed    = false

        this.isLeftButtonPressed   = false
        this.isRightButtonPressed  = false
        this.isMiddleButtonPressed = false

        //clicked
        this.whenAnyButtonClicked = ()=>{}

        this.whenLeftButtonClicked   = ()=>{}
        this.whenRightButtonClicked  = ()=>{}
        this.whenMiddleButtonClicked = ()=>{}

        window.addEventListener('mousedown', (e)=>{
            if(e.which == 1) this.isLeftButtonPressed   = true
            if(e.which == 2) this.isMiddleButtonPressed = true
            if(e.which == 3) this.isRightButtonPressed  = true

            this.isAnyButtonPressed = this.isLeftButtonPressed || this.isRightButtonPressed || this.isMiddleButtonPressed
        })

        window.addEventListener('mouseup', (e)=>{
            if(e.which == 1){
                this.isLeftButtonPressed   = false
                this.whenLeftButtonClicked()
            }  
            if(e.which == 2){       
                this.isMiddleButtonPressed   = false
                this.whenMiddleButtonClicked()
            }
            if(e.which == 3){
                this.isRightButtonPressed   = false
                this.whenRightButtonClicked()
            }
            this.whenAnyButtonClicked()
            
            this.isAnyButtonPressed = this.isLeftButtonPressed || this.isRightButtonPressed || this.isMiddleButtonPressed
        })
    }
}