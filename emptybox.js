

class EmptyBox {

    constructor(three_scene, parent, connection, recursion,  x,wx, y,wy, z,wz ) {
        this.parent = parent

        // create then box
        let bx = x  //box x
        let by = y
        let bz = z
        let bwx = wx
        let bwy = wy
        let bwz = wz
        if (recursion > 0) {
            bwx *=  Math.random()
            bwy *=  Math.random()
            bwz *=  Math.random()
        }
            
        let px = 2.0*Math.PI * Math.random() // phase in x
        let py = 2.0*Math.PI * Math.random()
        let pz = 2.0*Math.PI * Math.random()
        if (parent != null){
            this.my_box = new MyBox(three_scene, this.parent.my_box, connection, bwx,px, null, bwy,py, null, bwz,pz, null)
        } else {
            this.my_box = new MyBox(three_scene, null, connection, bwx,px, null, bwy,py, null, bwz,pz, null)
        }

        //create the recursive including empty boxs in each direction
        this.my_empty_boxes = null
        if (recursion > 0) {
            this.my_empty_boxes = new Array()
            
            //left-axis child (x)
            let ex = bx
            let ewx = wx - bwx 
            let ey = by
            let ewy = bwy 
            let ez = bz
            let ewz = bwz
            this.my_empty_boxes[0] = new EmptyBox(three_scene, this, 'x', recursion-1, ex,ewx, ey,ewy, ez,ewz)

            //right-axis child (y)
            ex = bx
            ewx = bwx 
            ey = by
            ewy = wy - bwy
            ez = bz
            ewz = bwz
            this.my_empty_boxes[1] = new EmptyBox(three_scene, this, 'y', recursion-1, ex,ewx, ey,ewy, ez,ewz)

            //top-axis child (z)
            ex = bx
            ewx = bwx 
            ey = by
            ewy = bwy
            ez = bz
            ewz = wz- bwz
            this.my_empty_boxes[2] = new EmptyBox(three_scene, this, 'z', recursion-1, ex,ewx, ey,ewy, ez,ewz)
        }

    }

    update(cur_time_ms, dt_ms) {
        this.my_box.update(cur_time_ms, dt_ms)
        if (this.my_empty_boxes != null) {
            for (let d = 0; d < 3; d ++) {
                this.my_empty_boxes[d].update(cur_time_ms, dt_ms)
            }
        }

    }
}