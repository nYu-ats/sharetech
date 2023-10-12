import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SalesRoomActionPanel";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Organisms/ActionPanel/SalesRoom",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
