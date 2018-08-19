// 音まわりの制御を行う、シングルトン的ユーティリティメソッド群

Sound = (function(){

    const CTX = new AudioContext();

    const PENTA_SCALE = [2,2,3,2,3];

    let ROOT_PITCH = 0;

    
    create = function(pitch)
    {
        let source = loadSource();
        source.detune.value = getPentaScale(pitch) * 100;
    
        let gain = CTX.createGain();
        gain.gain.value = 0.05;
    
        source.connect(gain);
        gain.connect(CTX.destination);
    
        return source;
    }

    setRootPitch = function(pitch)
    {
        ROOT_PITCH = pitch;
    }

    loadSource= function()
    {
        let osc = CTX.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 440;
        return osc;
    }

    getTime = function()
    {
        return CTX.currentTime;
    }

    getPentaScale = function(pitch)
    {
        const len = PENTA_SCALE.length;

        let ret = ROOT_PITCH;

        for(let i=0;i<pitch; i++){
            _i =  i % len;
            ret += PENTA_SCALE[_i];
        } 
    
        return ret;
    }

    return {
        create: create,
        setRootPitch: setRootPitch,
        loadSource: loadSource,
        getTime: getTime,
        getPentaScale: getPentaScale
    }

}());
