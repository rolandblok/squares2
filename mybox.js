

class MyBox {

    constructor(three_scene, parent, connection, wx,px, color_x, wy,py, color_y, wz,pz, color_z) {

        //  parent = parent box
        //  connection = to which side connected to parent : 'x', 'y', 'z'
        //  wx = the (max) width in x
        //  px = phase in x
        //
            //     Z
            //     7
            //    / \
            //   /   \
            //  2     6
            //  |\   /|
            //  | \ / |
            //  3  1  5
            // X \ | / Y
            //    \|/
            //     4

        this.parent = parent
        this.connection = connection
        this.my_time_ms = 0
        this.wx = wx
        this.px = px
        this.wy = wy
        this.py = py
        this.wz = wz
        this.pz = pz

        this.v1 = new THREE.Vector3(0, 0, 0)
        this.v2 = new THREE.Vector3(0, 0, 0) 
        this.v3 = new THREE.Vector3(0, 0, 0) 
        this.v4 = new THREE.Vector3(0, 0, 0) 
        this.v5 = new THREE.Vector3(0, 0, 0) 
        this.v6 = new THREE.Vector3(0, 0, 0) 
        this.v7 = new THREE.Vector3(0, 0, 0) 

        if (color_x == null) {
            color_x = new THREE.Color(Math.random() * 0xffffff)
        }
        if (color_y == null) {
            color_y = new THREE.Color(Math.random() * 0xffffff)
        }
        if (color_z == null) {
            color_z = new THREE.Color(Math.random() * 0xffffff)
        }

        // FACE # left
        this.square_geom_left = new THREE.Geometry();
        this.square_geom_left.vertices.push(this.v1, this.v2, this.v3, this.v4)
        this.square_geom_left.faces.push( new THREE.Face3(0, 1, 2),
                                            new THREE.Face3(0, 2, 3));
        this.material_left = new THREE.MeshBasicMaterial( {color: color_x} );
        this.square_mesh_left = new THREE.Mesh( this.square_geom_left, this.material_left)
        three_scene.add(  this.square_mesh_left );
                
        // FACE # rigth
        this.square_geom_right = new THREE.Geometry();
        this.square_geom_right.vertices.push(this.v1, this.v4, this.v5, this.v6)
        this.square_geom_right.faces.push( new THREE.Face3(0, 1, 2),
                                            new THREE.Face3(0, 2, 3));
        this.material_right = new THREE.MeshBasicMaterial( {color: color_y} );
        this.square_mesh_right = new THREE.Mesh( this.square_geom_right, this.material_right)
        three_scene.add(  this.square_mesh_right );
                
        // FACE # bottom
        this.square_geom_bottom = new THREE.Geometry();
        this.square_geom_bottom.vertices.push(this.v1, this.v6, this.v7, this.v2)
        this.square_geom_bottom.faces.push( new THREE.Face3(0, 1, 2),
                                        new THREE.Face3(0, 2, 3));

        this.material_bottom = new THREE.MeshBasicMaterial( {color: color_z} );
        this.square_mesh_bottom = new THREE.Mesh( this.square_geom_bottom, this.material_bottom)
        three_scene.add(  this.square_mesh_bottom );
                

        this._update_xyz()


    }

    update(cur_time_ms, dt_ms) {
        this.my_time_ms += dt_ms
        this._update_xyz()
    }

    get lx() {
        let max_width = this.wx
        if ((this.parent != null) && (this.connection != 'x')) {
                max_width = this.parent.lx
        }
        return max_width * 0.5 * (1.2 + 0.8*Math.sin(this.px + this.my_time_ms / 1000))
    }
    get ly() {
        let max_width = this.wy
        if ((this.parent != null) && (this.connection != 'y')) {
                max_width = this.parent.ly
           
        }
        return max_width * 0.5 * (1.2 + 0.8*Math.sin(this.px + this.my_time_ms / 1000))
    }
    get lz() {
        let max_width = this.wz
        if ((this.parent != null) && (this.connection != 'z')) {
                max_width = this.parent.lz
           
        }
        return max_width * 0.5 * (1.2 + 0.8*Math.sin(this.px + this.my_time_ms / 1000))
    }

    get x1() {
        if (this.parent != null) { 
            if (this.connection == 'x') {
                return (this.parent.x2)
            } else {
                return (this.parent.x1)
            }
        } else {return 0}
    }
    get y1() {
        if (this.parent != null) { 
            if (this.connection == 'y') {
                return (this.parent.y2)
            } else {
                return (this.parent.y1)
            }
        } else {return 0}
    }
    get z1() {
        if (this.parent != null) { 
            if (this.connection == 'z') {
                return (this.parent.z2)
            } else {
                return (this.parent.z1)
            }
        } else {return 0}
    }

    //get the left size x
    get x2() {
        if (this.parent != null) { 
            if (this.connection == 'x') {
                return (this.parent.x2 + this.lx)
            } else {
                return (this.parent.x1 + this.lx)
            }
        } else {return this.lx}
    } 
    get y2() {
        if (this.parent != null) { 
            if (this.connection == 'y') {
                return (this.parent.y2 + this.ly)
            } else {
                return (this.parent.y1 + this.ly)
            }
        } else {return this.ly}
    } 
    get z2() {
        if (this.parent != null) { 
            if (this.connection == 'z') {
                return (this.parent.z2 + this.lz)
            } else {
                return (this.parent.z1 + this.lz)
            }
        } else {return this.lz}
    } 

    _update_xyz() {

        this.v1.set(this.x2, this.y2, this.z2)
        this.v2.set(this.x2, this.y1, this.z2) 
        this.v3.set(this.x2, this.y1, this.z1) 
        this.v4.set(this.x2, this.y2, this.z1) 
        this.v5.set(this.x1, this.y2, this.z1) 
        this.v6.set(this.x1, this.y2, this.z2) 
        this.v7.set(this.x1, this.y1, this.z2) 

        this.square_geom_bottom.verticesNeedUpdate = true
        this.square_geom_left.verticesNeedUpdate = true
        this.square_geom_right.verticesNeedUpdate = true
    }


}