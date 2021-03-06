package com.teamderpy.shouldersurfing.mixins;

import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;

import com.teamderpy.shouldersurfing.ShoulderSurfing;
import com.teamderpy.shouldersurfing.config.Config;
import com.teamderpy.shouldersurfing.config.Perspective;

import net.minecraft.client.gui.IngameGui;
import net.minecraft.client.settings.PointOfView;

@Mixin(IngameGui.class)
public class MixinIngameGui
{
	@Redirect
	(
		method = "renderCrosshair",
		at = @At
		(
			value = "INVOKE",
			target = "net/minecraft/client/settings/PointOfView.isFirstPerson()Z"
		)
	)
	private boolean doRenderCrosshair(PointOfView pointOfView)
	{
		return Config.CLIENT.getCrosshairVisibility(Perspective.current()).doRender(ShoulderSurfing.STATE.isAiming());
	}
}
