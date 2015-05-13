// Autogenerated by gameplay-luagen
#ifndef LUA_CONTAINER_H_
#define LUA_CONTAINER_H_

namespace egret
{

// Lua bindings for Container.
int lua_Container__gc(lua_State* state);
int lua_Container_addControl(lua_State* state);
int lua_Container_addListener(lua_State* state);
int lua_Container_addRef(lua_State* state);
int lua_Container_addScript(lua_State* state);
int lua_Container_addScriptCallback(lua_State* state);
int lua_Container_canFocus(lua_State* state);
int lua_Container_clearScripts(lua_State* state);
int lua_Container_createAnimation(lua_State* state);
int lua_Container_createAnimationFromBy(lua_State* state);
int lua_Container_createAnimationFromTo(lua_State* state);
int lua_Container_destroyAnimation(lua_State* state);
int lua_Container_getAbsoluteBounds(lua_State* state);
int lua_Container_getActiveControl(lua_State* state);
int lua_Container_getAlignment(lua_State* state);
int lua_Container_getAnimation(lua_State* state);
int lua_Container_getAnimationPropertyComponentCount(lua_State* state);
int lua_Container_getAnimationPropertyValue(lua_State* state);
int lua_Container_getAutoSize(lua_State* state);
int lua_Container_getBorder(lua_State* state);
int lua_Container_getBounds(lua_State* state);
int lua_Container_getClip(lua_State* state);
int lua_Container_getClipBounds(lua_State* state);
int lua_Container_getConsumeInputEvents(lua_State* state);
int lua_Container_getControl(lua_State* state);
int lua_Container_getControlCount(lua_State* state);
int lua_Container_getCursorColor(lua_State* state);
int lua_Container_getCursorRegion(lua_State* state);
int lua_Container_getCursorUVs(lua_State* state);
int lua_Container_getFocusIndex(lua_State* state);
int lua_Container_getFont(lua_State* state);
int lua_Container_getFontSize(lua_State* state);
int lua_Container_getHeight(lua_State* state);
int lua_Container_getId(lua_State* state);
int lua_Container_getImageColor(lua_State* state);
int lua_Container_getImageRegion(lua_State* state);
int lua_Container_getImageUVs(lua_State* state);
int lua_Container_getLayout(lua_State* state);
int lua_Container_getMargin(lua_State* state);
int lua_Container_getOpacity(lua_State* state);
int lua_Container_getPadding(lua_State* state);
int lua_Container_getParent(lua_State* state);
int lua_Container_getRefCount(lua_State* state);
int lua_Container_getScriptEvent(lua_State* state);
int lua_Container_getScroll(lua_State* state);
int lua_Container_getScrollPosition(lua_State* state);
int lua_Container_getScrollWheelRequiresFocus(lua_State* state);
int lua_Container_getScrollWheelSpeed(lua_State* state);
int lua_Container_getScrollingFriction(lua_State* state);
int lua_Container_getSkinColor(lua_State* state);
int lua_Container_getSkinRegion(lua_State* state);
int lua_Container_getState(lua_State* state);
int lua_Container_getStyle(lua_State* state);
int lua_Container_getTextAlignment(lua_State* state);
int lua_Container_getTextColor(lua_State* state);
int lua_Container_getTextRightToLeft(lua_State* state);
int lua_Container_getTheme(lua_State* state);
int lua_Container_getTopLevelForm(lua_State* state);
int lua_Container_getTypeName(lua_State* state);
int lua_Container_getWidth(lua_State* state);
int lua_Container_getX(lua_State* state);
int lua_Container_getY(lua_State* state);
int lua_Container_getZIndex(lua_State* state);
int lua_Container_hasFocus(lua_State* state);
int lua_Container_hasScriptListener(lua_State* state);
int lua_Container_insertControl(lua_State* state);
int lua_Container_isChild(lua_State* state);
int lua_Container_isContainer(lua_State* state);
int lua_Container_isEnabled(lua_State* state);
int lua_Container_isEnabledInHierarchy(lua_State* state);
int lua_Container_isForm(lua_State* state);
int lua_Container_isHeightPercentage(lua_State* state);
int lua_Container_isScrollBarsAutoHide(lua_State* state);
int lua_Container_isScrolling(lua_State* state);
int lua_Container_isVisible(lua_State* state);
int lua_Container_isVisibleInHierarchy(lua_State* state);
int lua_Container_isWidthPercentage(lua_State* state);
int lua_Container_isXPercentage(lua_State* state);
int lua_Container_isYPercentage(lua_State* state);
int lua_Container_moveFocus(lua_State* state);
int lua_Container_release(lua_State* state);
int lua_Container_removeControl(lua_State* state);
int lua_Container_removeListener(lua_State* state);
int lua_Container_removeScript(lua_State* state);
int lua_Container_removeScriptCallback(lua_State* state);
int lua_Container_setActiveControl(lua_State* state);
int lua_Container_setAlignment(lua_State* state);
int lua_Container_setAnimationPropertyValue(lua_State* state);
int lua_Container_setAutoSize(lua_State* state);
int lua_Container_setBorder(lua_State* state);
int lua_Container_setBounds(lua_State* state);
int lua_Container_setCanFocus(lua_State* state);
int lua_Container_setConsumeInputEvents(lua_State* state);
int lua_Container_setCursorColor(lua_State* state);
int lua_Container_setCursorRegion(lua_State* state);
int lua_Container_setEnabled(lua_State* state);
int lua_Container_setFocus(lua_State* state);
int lua_Container_setFocusIndex(lua_State* state);
int lua_Container_setFont(lua_State* state);
int lua_Container_setFontSize(lua_State* state);
int lua_Container_setHeight(lua_State* state);
int lua_Container_setId(lua_State* state);
int lua_Container_setImageColor(lua_State* state);
int lua_Container_setImageRegion(lua_State* state);
int lua_Container_setLayout(lua_State* state);
int lua_Container_setMargin(lua_State* state);
int lua_Container_setOpacity(lua_State* state);
int lua_Container_setPadding(lua_State* state);
int lua_Container_setPosition(lua_State* state);
int lua_Container_setScroll(lua_State* state);
int lua_Container_setScrollBarsAutoHide(lua_State* state);
int lua_Container_setScrollPosition(lua_State* state);
int lua_Container_setScrollWheelRequiresFocus(lua_State* state);
int lua_Container_setScrollWheelSpeed(lua_State* state);
int lua_Container_setScrollingFriction(lua_State* state);
int lua_Container_setSize(lua_State* state);
int lua_Container_setSkinColor(lua_State* state);
int lua_Container_setSkinRegion(lua_State* state);
int lua_Container_setStyle(lua_State* state);
int lua_Container_setTextAlignment(lua_State* state);
int lua_Container_setTextColor(lua_State* state);
int lua_Container_setTextRightToLeft(lua_State* state);
int lua_Container_setVisible(lua_State* state);
int lua_Container_setWidth(lua_State* state);
int lua_Container_setX(lua_State* state);
int lua_Container_setY(lua_State* state);
int lua_Container_setZIndex(lua_State* state);
int lua_Container_static_ANIMATE_OPACITY(lua_State* state);
int lua_Container_static_ANIMATE_POSITION(lua_State* state);
int lua_Container_static_ANIMATE_POSITION_X(lua_State* state);
int lua_Container_static_ANIMATE_POSITION_Y(lua_State* state);
int lua_Container_static_ANIMATE_SCROLLBAR_OPACITY(lua_State* state);
int lua_Container_static_ANIMATE_SIZE(lua_State* state);
int lua_Container_static_ANIMATE_SIZE_HEIGHT(lua_State* state);
int lua_Container_static_ANIMATE_SIZE_WIDTH(lua_State* state);
int lua_Container_static_create(lua_State* state);
int lua_Container_stopScrolling(lua_State* state);

void luaRegister_Container();

}

#endif