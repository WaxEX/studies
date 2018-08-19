// 楽譜データ用のクラス
// c.f. Mapは継承せずに、内部プロパティとして持つべきかも
class Notes extends Map
{
    constructor(json = {})
    {
        super();
        for (const [key, val] of Object.entries(json)) {
            this.set(+key, new Set(val));
        }
    }

    addNote(flame, pitch)
    {
        if(this.has(flame)){
            this.get(flame).add(pitch);
        }else{
            this.set(flame, new Set([pitch]));
        }
    }

    remNote(flame, pitch)
    {
        if(!this.has(flame)) return;

        this.get(flame).delete(pitch);

        if(this.get(flame).size == 0) this.delete(flame);
    }

    getNotesIn(flame)
    {
        return this.has(flame)? this.get(flame) : new Set();
    }

    toJSON()
    {
        const json = {};
        for (const [key, val] of this) {
            json[key] = [...val]
        }
        return json;
    }
}


