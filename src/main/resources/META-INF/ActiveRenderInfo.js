function printInstructions(instructions) {
	for(var x = 0; x < instructions.size(); x++) {
		print((x + 1) + " " + instructions.get(x));
	}
}

function initializeCoreMod() {
	return {
		'coremodone': {
			'target': {
				'type': 'CLASS',
				'name': 'net.minecraft.client.renderer.ActiveRenderInfo'
			},
			'transformer': function(classNode) {
				var Opcodes = Java.type('org.objectweb.asm.Opcodes');
				var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
				var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
				var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
				var FieldInsnNode = Java.type('org.objectweb.asm.tree.FieldInsnNode');
				var methods = classNode.methods;
				
				for(x in methods) {
					var method = methods[x];
					
					if(method.name.equals("update") || method.name.equals("func_216772_a")) {
						var code = method.instructions;
						var offset1 = code.get(106);
						
						// net/minecraft/client/renderer/ActiveRenderInfo#update:50
						// this.movePosition(-this.calcCameraDistance(4.0D * InjectionDelegation.getShoulderZoomMod()), 0.0D, 0.0D);
						
						code.insertBefore(offset1, new MethodInsnNode(Opcodes.INVOKESTATIC, "com/teamderpy/shouldersurfing/asm/InjectionDelegation", "getShoulderZoomMod", "()F", false));
						code.insertBefore(offset1, new InsnNode(Opcodes.F2D));
						code.insertBefore(offset1, new InsnNode(Opcodes.DMUL));
						
						var offset2 = code.get(110 + 3);
						
						// net/minecraft/client/renderer/ActiveRenderInfo#update:50
						// InjectionDelegation.movePosition(this, -this.calcCameraDistance(4.0D * InjectionDelegation.getShoulderZoomMod()), 0.0D, 0.0D);
						
						code.set(offset2, new MethodInsnNode(Opcodes.INVOKESTATIC, "com/teamderpy/shouldersurfing/asm/InjectionDelegation", "movePosition", "(Lnet/minecraft/client/renderer/ActiveRenderInfo;DDD)V", false));
					} else if(method.name.equals("calcCameraDistance") || method.name.equals("func_216779_a")) {
						var code = method.instructions;
						var offset = code.get(168);
						
						// net/minecraft/client/renderer/ActiveRenderInfo#calcCameraDistance:91
						// return InjectionDelegation.calcCameraDistance(startingDistance, this);
						
						code.insertBefore(offset, new VarInsnNode(Opcodes.DLOAD, 1));
						code.insertBefore(offset, new VarInsnNode(Opcodes.ALOAD, 0));
						code.insertBefore(offset, new MethodInsnNode(Opcodes.INVOKESTATIC, "com/teamderpy/shouldersurfing/asm/InjectionDelegation", "calcCameraDistance", "(DLnet/minecraft/client/renderer/ActiveRenderInfo;)D", false));
						code.insertBefore(offset, new VarInsnNode(Opcodes.DSTORE, 1));
					}
				}
				
				return classNode;
			}
		}
	}
}