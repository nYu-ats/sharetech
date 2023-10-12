import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SalesContentForm";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Organisms/Form/SalesContentForm",
  component: Component,
  args: {
    tagFields: [],
    onClick: action("clicked"),
    onSubmit: action("submited"),
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
