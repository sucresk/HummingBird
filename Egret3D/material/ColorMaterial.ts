/**
 * Created by BKSwan on 2015/9/22.
 */
module BlackSwan {
    export  class  ColorMaterial extends  MaterialBase {
        constructor( r:number , g:number , b:number ,a:number ) {
            super();
            this.diffusePass = new ColorPass(r,g,b,a);
        }
    }
}