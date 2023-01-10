import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ResearchIcon } from "./ResearchIcon";

export default {
  title: "Components/Assets/Icon/TechNote/ResearchIcon",
  component: ResearchIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof ResearchIcon>;

const Template: ComponentStory<typeof ResearchIcon> = (args) => (
  <ResearchIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
