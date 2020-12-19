

class MyBox {

    constructor(three_scene, x1,x2,color_x, y1,y2,color_y, z1,z2,color_z) {

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

        this.x1 = x1
        this.x2 = x2
        this.y1 = y1
        this.y2 = y2
        this.z1 = z1
        this.z2 = z2

        this.v1 = new THREE.Vector3(x2, y2, z2)
        this.v2 = new THREE.Vector3(x2, y1, z2) 
        this.v3 = new THREE.Vector3(x2, y1, z1) 
        this.v4 = new THREE.Vector3(x2, y2, z1) 
        this.v5 = new THREE.Vector3(x1, y2, z1) 
        this.v6 = new THREE.Vector3(x1, y2, z2) 
        this.v7 = new THREE.Vector3(x1, y1, z2) 

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
            

    }

    change_x(x1,x2) {
        this.x1 = x1
        this.x2 = x2
        this._update_xyz()
    }
    change_y(y1,y2) {
        this.y1 = y1
        this.y2 = y2
        this._update_xyz()
    }
    change_z(z1,z2) {
        this.z1 = z1
        this.z2 = z2
        this._update_xyz()
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