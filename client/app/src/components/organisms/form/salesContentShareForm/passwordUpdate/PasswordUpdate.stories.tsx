import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./PasswordUpdate";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Organisms/Form/SalesContentShare/PasswordUpdate",
  component: Component,
  args: {},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
