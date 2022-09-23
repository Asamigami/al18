class L2D {
    constructor (basePath) {
        this.basePath = basePath;
        this.loader = new PIXI.loaders.Loader(this.basePath);
        this.animatorBuilder = new LIVE2DCUBISMFRAMEWORK.AnimatorBuilder();
        this.timeScale = 1;
        this.models = {};
    }
    
    setPhysics3Json (value) {
        if (!this.physicsRigBuilder) {
            this.physicsRigBuilder = new LIVE2DCUBISMFRAMEWORK.PhysicsRigBuilder();
        }
        this.physicsRigBuilder.setPhysics3Json(value);

        return this;
    }
   
    load (name, v) {
        if (!this.models[name]) {
            let modelDir = name+'/';
            let modelPath = name+'.model3.json';
            let textures = new Array();
            let textureCount = 0;
            let motionNames = new Array();
            let modelNames = new Array();

            //if (!modelNames.includes(name+'_model')){
                this.loader.add(name+'_model', modelDir+modelPath, { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                modelNames.push(name+'_model');
            //} 
			
            this.loader.load((loader, resources) => {
                let model3Obj = resources[name+'_model'].data;
                
                if (typeof(model3Obj['FileReferences']['Moc']) !== "undefined") {
                    loader.add(name+'_moc', modelDir+model3Obj['FileReferences']['Moc'], { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER });
                }

                if (typeof(model3Obj['FileReferences']['Textures']) !== "undefined") {
                    model3Obj['FileReferences']['Textures'].forEach((element) => {
                        loader.add(name+'_texture'+textureCount, modelDir+element);
                        textureCount++;
                    });
                }

                if (typeof(model3Obj['FileReferences']['Physics']) !== "undefined") {
                    loader.add(name+'_physics', modelDir+model3Obj['FileReferences']['Physics'], { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                }

				// START: Load default motions to set proper order and make sure none are missing
				loader.add(name+'_complete', modelDir+'motions/complete.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_complete');
				loader.add(name+'_effect', modelDir+'motions/effect.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_effect');
				loader.add(name+'_home', modelDir+'motions/home.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_home');
				loader.add(name+'_idle', modelDir+'motions/idle.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_idle');
				loader.add(name+'_login', modelDir+'motions/login.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_login');
				loader.add(name+'_mail', modelDir+'motions/mail.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_mail');
				loader.add(name+'_main_1', modelDir+'motions/main_1.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_main_1');
				loader.add(name+'_main_2', modelDir+'motions/main_2.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_main_2');
				loader.add(name+'_main_3', modelDir+'motions/main_3.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_main_3');
				loader.add(name+'_mission', modelDir+'motions/mission.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_mission');
				loader.add(name+'_mission_complete', modelDir+'motions/mission_complete.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_mission_complete');
				loader.add(name+'_touch_body', modelDir+'motions/touch_body.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_touch_body');
				loader.add(name+'_touch_head', modelDir+'motions/touch_head.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_touch_head');
				loader.add(name+'_touch_special', modelDir+'motions/touch_special.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_touch_special');
				loader.add(name+'_wedding', modelDir+'motions/wedding.motion3.json', { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                motionNames.push(name+'_wedding');
				// END: Load default motions to set proper order and make sure none are missing

                if (typeof(model3Obj['FileReferences']['Motions']) !== "undefined") {
                    for (let group in model3Obj['FileReferences']['Motions']) {
                        model3Obj['FileReferences']['Motions'][group].forEach((element) => {
                            let motionName = element['File'].split('/').pop().split('.').shift();
                            if (!motionNames.includes(name+'_'+motionName)){
                                loader.add(name+'_'+motionName, modelDir+element['File'], { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                                motionNames.push(name+'_'+motionName);
                            }
							// removed else statement since it wasn't adding anything of value
                        });
                    }
                }

                let groups = null;
                if (typeof(model3Obj['Groups'] !== "undefined")) {
                    groups = LIVE2DCUBISMFRAMEWORK.Groups.fromModel3Json(model3Obj);
                }

                loader.load((l, r) => {
                    let moc = null;
                    if (typeof(r[name+'_moc']) !== "undefined") {
                        moc = Live2DCubismCore.Moc.fromArrayBuffer(r[name+'_moc'].data);
                    }

                    if (typeof(r[name+'_texture'+0]) !== "undefined") {
                        for (let i = 0; i < textureCount; i++) {
                            textures.splice(i, 0, r[name+'_texture'+i].texture);
                        }
                    }

                    if (typeof(r[name+'_physics']) !== "undefined") {
                        this.setPhysics3Json(r[name+'_physics'].data);
                    }

                    let motions = new Map();
                    motionNames.forEach((element) => {
                        let n = element.split(name+'_').pop();
                        motions.set(n, LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(r[element].data));
                    });
		
					// START: Remove motions that failed to load
					if (typeof(motions) !== "undefined") {
						motions.forEach((element, key) => {
							if (element === null) {
								motions.delete(key);
							}
						});
					}
					// END: Remove motions that failed to load
					
                    let model = null;
                    let coreModel = Live2DCubismCore.Model.fromMoc(moc);
                    if (coreModel == null) {
                        return;
                    }

                    let animator = this.animatorBuilder
                        .setTarget(coreModel)
                        .setTimeScale(this.timeScale)
                        .build();

                    let physicsRig = this.physicsRigBuilder
                        .setTarget(coreModel)
                        .setTimeScale(this.timeScale)
                        .build();

                    let userData = null;

                    model = LIVE2DCUBISMPIXI.Model._create(coreModel, textures, animator, physicsRig, userData, groups);
                    model.motions = motions;
                    this.models[name] = model;

                    v.changeCanvas(model);
                });
            });
        } else {
            v.changeCanvas(this.models[name]);
        }
    }
}
