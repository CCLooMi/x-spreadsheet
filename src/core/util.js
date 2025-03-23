import Config from "../config";

const k = [1518500249, 1859775393, -1894007588, -899497514];
function newM(m) {
    m=m||[];
    m[0] = 1732584193;
    m[1] = -271733879;
    m[2] = ~m[0];
    m[3] = ~m[1];
    m[4] = -1009589776;
    return m;
}
const f = [
    function (m) { return m[1] & m[2] | ~m[1] & m[3]; },
    function (m) { return m[1] ^ m[2] ^ m[3]; },
    function (m) { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
    function (m) { return m[1] ^ m[2] ^ m[3]; }
];
function rol(n, c) { return n << c | n >>> (32 - c); };
export function sha1String(str){
    return bytesToHex(sha1(strToUTF8(str)));
}
export function SHA1String(str) {
    return bytesToHEX(sha1(strToUTF8(str)));
}
export function sha1(data) {
    var i, j, t;
    var l = ((data.length + 8) >>> 6 << 4) + 16;
    var s = new Uint8Array(l << 2);
    s.set(data);
    s = new Uint32Array(s.buffer);
    for (t = new DataView(s.buffer), i = 0; i < l; i++){
        s[i] = t.getUint32(i << 2);
    }
    s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
    s[l - 1] = data.length << 3;

    var m=newM(),w=[];
    for (i = 0; i < s.length; i += 16) {
        var o = m.slice(0);
        for (j = 0; j < 80; j++){
            w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            t = rol(m[0], 5) + f[j / 20 | 0](m) + m[4] + w[j] + k[j / 20 | 0] | 0;
            m[1] = rol(m[1], 30);
            m.pop();
            m.unshift(t);
        }
        for (j = 0; j < 5; j++){
            m[j] = m[j] + o[j] | 0;
        }
    };
    m = new Uint32Array(m);
    t = new DataView(m.buffer);
    for(var i=0;i<5;i++){
        m[i]=t.getUint32(i<<2);
    }
    return new Uint8Array(m.buffer);
};
let csm=[],CSM=[];
(function () {
    const cs="0123456789abcdef";
    const CS="0123456789ABCDEF";
    let n=0;
    for(let i=0;i<16;i++){
        for(let j=0;j<16;j++,n++){
            csm[n]=cs[i]+cs[j];
            CSM[n]=CS[i]+CS[j];
        }
    }
})();
export function bytesToHex(a) {
    var s='';
    for(var i=0;i<a.length;i++){
        s+=csm[a[i]&0xff];
    }
    return s;
}
export function bytesToHEX(a) {
    let s='';
    for(let i=0;i<a.length;i++){
        s+=CSM[a[i]&0xff];
    }
    return s;
}
export function hexToBytes(hex){
    let bytes=[];
    //填充到指定长度，否则当hex末尾为00时，生成bytes长度将不够
    bytes.push.apply(bytes,new Uint8Array((hex.length+1)/2));
    for(let i=0,j=0;i<hex.length;i++) {
        switch (hex.charAt(i)) {
            case '1':bytes[j]|=0x10>>((i&1)<<2);break;
            case '2':bytes[j]|=0x20>>((i&1)<<2);break;
            case '3':bytes[j]|=0x30>>((i&1)<<2);break;
            case '4':bytes[j]|=0x40>>((i&1)<<2);break;
            case '5':bytes[j]|=0x50>>((i&1)<<2);break;
            case '6':bytes[j]|=0x60>>((i&1)<<2);break;
            case '7':bytes[j]|=0x70>>((i&1)<<2);break;
            case '8':bytes[j]|=0x80>>((i&1)<<2);break;
            case '9':bytes[j]|=0x90>>((i&1)<<2);break;
            case 'a':case 'A':bytes[j]|=0xA0>>((i&1)<<2);break;
            case 'b':case 'B':bytes[j]|=0xB0>>((i&1)<<2);break;
            case 'c':case 'C':bytes[j]|=0xC0>>((i&1)<<2);break;
            case 'd':case 'D':bytes[j]|=0xD0>>((i&1)<<2);break;
            case 'e':case 'E':bytes[j]|=0xE0>>((i&1)<<2);break;
            case 'f':case 'F':bytes[j]|=0xF0>>((i&1)<<2);break;
            default:break;
        }
        j+=i&1;
    }
    return new Uint8Array(bytes);
}
export function strToUTF8(str) {
    let i, r = [], c, x;
    for (i = 0; i < str.length; i++)
        if ((c = str.charCodeAt(i)) < 0x80) {
            r.push(c);
        } else if (c < 0x800){
            r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
        } else {
            if ((x = c ^ 0xD800) >> 10 == 0) { //对四字节UTF-16转换为Unicode
                c = (x << 10) + (str.charCodeAt(++i) ^ 0xDC00) + 0x10000;
                r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
            } else {
                r.push(0xE0 + (c >> 12 & 0xF));
            }
            r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
        };
    return r;
}
export function combineSHAStr(a,b){
    a = new Uint8Array(hexToBytes(a));
    b = new Uint8Array(hexToBytes(b));
    for(let i=0;i<a.length;i++){
        a[i]^=b[i]
    }
    return bytesToHex(a);
}
export function uuid(len) {
    len = len>>1||16;
    if(len<1){len=16;}
    const bid = new ArrayBuffer(len);
    const dv = new DataView(bid);
    for(let i=0;i<len;i++){
        dv.setUint8(i,Math.random()*255|0);
    }
    return bytesToHex(new Uint8Array(bid));
}
export function clickOutside(ele,actionFunc,autoRelease) {
    let container = Config.getContainerEle();
    if(ele===container){
        return;
    }
    let onClick=false;
    let dsp1=attacheEvent(ele)
        .on('click',e=>(onClick=true))
        .getDispose();
    let dsp2=attacheEvent(container)
        .on('click',e=>{
            let x=e.clientX,y=e.clientY;
            if(!x&&!y){
                return;//fix firefox click select bug
            }
            let rect=ele.getBoundingClientRect();
            if(!(x>rect.x&&y>rect.y&&x<(rect.x+rect.width)&&y<(rect.y+rect.height))){
                if(onClick){
                    return;
                }
                actionFunc(e);
            }else{
                //被遮挡时
                if(!onClick){
                    actionFunc(e);
                }
            }
            onClick=false;
        }).getDispose();
    function release() {
        dsp1(),dsp2();
    }
    if(autoRelease===false){
        return release;
    }
    watchInDomTree(ele,release);
}
export function final(f) {
    var to=setTimeout(()=>{
        clearTimeout(to);
        f&&f();
    },0);
}
export function pFinal(f) {
    var opt={};
    var p = new Promise(function (resolve, reject) {
        var to=setTimeout(()=>{
            clearTimeout(to);
            try{
                if(!opt.args){
                    resolve(f());
                }else{
                    opt.args.then(function (args) {
                        resolve(f.apply(null,args));
                    }).catch(reject);
                }
            }catch (e) {
                reject(e);
            }
        },0);
    });
    //支持异步参数
    p.args=function (...args) {
        if(Array.isArray(args[0])){
            args=args[0];
        }
        opt.args=Promise.all(args);
        return this;
    }
    return p;
}
export function isInPage(node) {
    return node.isConnected||document.contains(node);
}
export function isHidden(node) {
    var rect=(node.host||node).getBoundingClientRect();
    return !rect||!(rect.width||rect.height);
}
export function attacheEvent(ele) {
    if(!ele||!ele.addEventListener){
        return{
            on:()=>this,
            autoRelease:()=>this,
            getDispose:()=>this
        };
    }
    let eventDispose=[];
    return {
        'on':function (type,func) {
            ele.addEventListener(type,func);
            eventDispose.push(function(){
                ele.removeEventListener(type,func);
            });
            return this;
        },
        'autoRelease':function (refEle) {
            watchInDomTree(refEle||Config.getContainerEle(),this.getDispose());
        },
        'getDispose':function (f) {
            let dsp=function () {
                for(let i=0;i<eventDispose.length;i++){
                    eventDispose[i]();
                    delete eventDispose[i];
                }
                eventDispose=null;
            };
            if(typeof f == 'function'){
                f(dsp);
            }
            return dsp;
        }
    };
}
//批量监控domTree ele
export const watchInDomTree = (function () {
    const watchSet={};
    const relKey=Symbol('release');
    const cbKey = Symbol('callbacks');
    function watchInDomTree(ele,...callbacks) {
        if(!ele||!(ele instanceof Node||ele instanceof Attr)){
            return;
        }
        callbacks = callbacks.filter(f=>f instanceof Function);
        if(!callbacks.length){
            return;
        }
        if(!isInPage(ele)){
            console.warn([ele,'not in page.']);
        }
        let _wf=watchSet[ele._uuid];
        if(_wf){
            let cbs=_wf[cbKey];
            cbs.push(...callbacks);
            return function () {
                for(let i=0;i<callbacks.length;i++){
                    let callback = callbacks[i];
                    cbs.splice(cbs.indexOf(callback),1);
                }
                callbacks.length=0;
                if(!cbs.length){
                    _wf[relKey]=true;
                }
            };
        }
        let wf=function (){
            if(!isInPage(ele)){
                for(let i=0;i<wf[cbKey].length;i++){
                    try{
                        wf[cbKey][i](ele);
                        clearObjProperties(ele);
                    }catch (e) {}
                }
                return true;
            }
            if(wf[relKey]){
                return true;
            }
            return false;
        };
        wf[cbKey]=[...callbacks];
        watchSet[ele._uuid]=wf;
        if(Object.keys(watchSet).length==1){
            startWatch();
        }
        return function (){
            let cbs=wf[cbKey];
            for(let i=0;i<callbacks.length;i++){
                let callback = callbacks[i];
                cbs.splice(cbs.indexOf(callback),1);
            }
            callbacks.length=0;
            if(!cbs.length){
                wf[relKey]=true;
            }
        };
    }
    function startWatch() {
        startWatch.to&&clearTimeout(startWatch.to);
        if(Object.keys(watchSet).length){
            for(let p in watchSet){
                if(watchSet[p]()){
                    delete watchSet[p];
                }
            }
        }
        if(Object.keys(watchSet).length){
            startWatch.to=setTimeout(startWatch,200);
        }
    }
    return watchInDomTree;
})();
export const watchDomResize = (function () {
    const watchSet={};
    const relKey=Symbol('release');
    const cbKey =Symbol('callback');
    function watchDomResize(ele,...callbacks) {
        if(!ele||!(ele instanceof Node||ele instanceof Attr)){
            return;
        }
        if(ele instanceof ShadowRoot){
            ele=ele.host;
        }
        callbacks = callbacks.filter(f=>f instanceof Function);
        if(!callbacks.length){
            return;
        }
        if(!isInPage(ele)){
            console.warn([ele,'not in page.']);
        }
        let _wf=watchSet[ele._uuid];
        if(_wf){
            let cbs=_wf[cbKey];
            cbs.push(...callbacks);
            return function () {
                for(var i=0;i<callbacks.length;i++){
                    let callback = callbacks[i];
                    cbs.splice(cbs.indexOf(callback),1);
                }
                callbacks.length=0;
                if(!cbs.length){
                    _wf[relKey]=true;
                }
            };
        }
        let wf=(function (width,height,tid) {
            return function (){
                if(ele.offsetWidth!=width||ele.offsetHeight!=height){
                    width=ele.offsetWidth,height=ele.offsetHeight;
                    clearTimeout(ele[tid]);
                    ele[tid]=setTimeout(()=>{
                        for(let i=0;i<wf[cbKey].length;i++){
                            try{
                                wf[cbKey][i](ele);
                            }catch (e) {}
                        }
                    },500);
                }
                if(!isInPage(ele)){
                    return true;
                }
                if(wf[relKey]){
                    return true;
                }
                return false;
            };
        })(ele.offsetWidth,ele.offsetHeight,uuid(16));
        wf[cbKey]=[...callbacks];
        watchSet[ele._uuid]=wf;
        if(Object.keys(watchSet).length==1){
            startWatch();
        }
        return function (){
            let cbs=wf[cbKey];
            for(let i=0;i<callbacks.length;i++){
                let callback = callbacks[i];
                cbs.splice(cbs.indexOf(callback),1);
            }
            callbacks.length=0;
            if(!cbs.length){
                wf[relKey]=true;
            }
        };
    }
    function startWatch() {
        startWatch.to&&clearTimeout(startWatch.to);
        if(Object.keys(watchSet).length){
            for(let p in watchSet){
                if(watchSet[p]()){
                    delete watchSet[p];
                }
            }
        }
        if(Object.keys(watchSet).length){
            startWatch.to=setTimeout(startWatch,200);
        }
    }
    return watchDomResize;
})();
export const watchDomHidden = (function () {
    const watchSet={};
    const relKey=Symbol('release');
    const cbKey = Symbol('callbacks');
    function watchDomHidden(ele,...callbacks) {
        if(!ele||!(ele instanceof Node||ele instanceof Attr)){
            return;
        }
        callbacks = callbacks.filter(f=>f instanceof Function);
        if(!callbacks.length){
            return;
        }
        if(!isInPage(ele)){
            console.warn([ele,'not in page.']);
        }
        let _wf=watchSet[ele._uuid];
        if(_wf){
            let cbs=_wf[cbKey];
            cbs.push(...callbacks);
            return function () {
                for(let i=0;i<callbacks.length;i++){
                    let callback = callbacks[i];
                    cbs.splice(cbs.indexOf(callback),1);
                }
                callbacks.length=0;
                if(!cbs.length){
                    _wf[relKey]=true;
                }
            };
        }
        let wf=function (){
            if(isHidden(ele)){
                for(let i=0;i<wf[cbKey].length;i++){
                    try{
                        wf[cbKey][i](ele);
                        clearObjProperties(ele);
                    }catch (e) {}
                }
                return true;
            }
            if(wf[relKey]){
                return true;
            }
            return false;
        };
        wf[cbKey]=[...callbacks];
        watchSet[ele._uuid]=wf;
        if(Object.keys(watchSet).length==1){
            startWatch();
        }
        return function (){
            let cbs=wf[cbKey];
            for(let i=0;i<callbacks.length;i++){
                let callback = callbacks[i];
                cbs.splice(cbs.indexOf(callback),1);
            }
            callbacks.length=0;
            if(!cbs.length){
                wf[relKey]=true;
            }
        };
    }
    function startWatch() {
        startWatch.to&&clearTimeout(startWatch.to);
        if(Object.keys(watchSet).length){
            for(let p in watchSet){
                if(watchSet[p]()){
                    delete watchSet[p];
                }
            }
        }
        if(Object.keys(watchSet).length){
            startWatch.to=setTimeout(startWatch,200);
        }
    }
    return watchDomHidden;
})();
function clearObjProperties(...objs) {
    if(Array.isArray(objs[0])){
        objs=objs[0];
    }
    for(let i=0;i<objs.length;i++){
        let obj=objs[i];
        let ks=Object.keys(obj);
        for(let ii=0;ii<ks.length;ii++){
            delete obj[ks[ii]];
        }
    }
}